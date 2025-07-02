use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo, SetAuthority};
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::program::invoke;
use anchor_spl::token::spl_token::instruction::AuthorityType;


#[account]
pub struct Order {
    pub id: u64,
    pub buyer: Pubkey,
    pub amount: u64,
    pub created_at: i64,
    pub is_paid: bool,
    pub nft_mint: Pubkey, 
}

#[program]
pub mod remint_contract {
    use super::*;

    pub fn create_order(ctx: Context<CreateOrder>, id: u64, amount: u64) -> Result<()> {
        let order = &mut ctx.accounts.order;
        order.id = id;
        order.buyer = *ctx.accounts.buyer.key;
        order.amount = amount;
        order.created_at = Clock::get()?.unix_timestamp;
        order.is_paid = false;
        order.nft_mint = Pubkey::default();
        Ok(())
    }

    pub fn pay_and_mint_nft(ctx: Context<PayAndMintNFT>) -> Result<()> {
        let order = &mut ctx.accounts.order;
        require!(!order.is_paid, CustomError::AlreadyPaid);

       
        let ix = system_instruction::transfer(
            ctx.accounts.buyer.key,
            ctx.accounts.merchant.key,
            order.amount,
        );
        invoke(
            &ix,
            &[
                ctx.accounts.buyer.to_account_info(),
                ctx.accounts.merchant.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        
        let cpi_accounts = MintTo {
            mint: ctx.accounts.nft_mint.to_account_info(),
            to: ctx.accounts.nft_account.to_account_info(),
            authority: ctx.accounts.buyer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::mint_to(cpi_ctx, 1)?;

        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            SetAuthority {
                account_or_mint: ctx.accounts.nft_mint.to_account_info(),
                current_authority: ctx.accounts.buyer.to_account_info(),
            },
        );
        token::set_authority(
            cpi_ctx,
            AuthorityType::MintTokens,
            None,
        )?;

        order.is_paid = true;
        order.nft_mint = ctx.accounts.nft_mint.key();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateOrder<'info> {
    #[account(init, payer = buyer, space = 8 + 8 + 32 + 8 + 8 + 1 + 32)]
    pub order: Account<'info, Order>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PayAndMintNFT<'info> {
    #[account(mut)]
    pub order: Account<'info, Order>,
    #[account(mut)]
    pub buyer: Signer<'info>,
   
    #[account(mut)]
    pub merchant: UncheckedAccount<'info>,
    #[account(mut)]
    pub nft_mint: Account<'info, Mint>,
    #[account(mut)]
    pub nft_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum CustomError {
    #[msg("Order already paid")] 
    AlreadyPaid,
} 