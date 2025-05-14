import { NextResponse, NextRequest } from 'next/server';
import { Metaplex, keypairIdentity, irysStorage } from '@metaplex-foundation/js';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import Irys from '@irys/sdk';
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl, name, description, recipient } = await req.json();
    
    const { uri } = await createMetadata({
      name,
      description,
      imageDataUrl,
    });
    console.log(uri)
    const nft = await mintNFT({
      uri,
      name,
      recipient,
    });
    console.log(nft)
    return NextResponse.json({ success: true, nft });
  } catch (error) {
    console.error('Mint error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function createMetadata({
    name,
    description,
    imageDataUrl,
}: {
    name: string;
    description: string;
    imageDataUrl: string;
}) {
    const connection = new Connection('https://api.devnet.solana.com');
    const wallet = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
    const truncatedName = name.length > 32 ? name.substring(0, 32) : name;
    
    const irys = new Irys({
        url: 'https://devnet.irys.xyz',
        token: 'solana',
        key: wallet.secretKey,
        config: { providerUrl: connection.rpcEndpoint },
    });
    
    
    await irys.fund(0.1 * LAMPORTS_PER_SOL);
    
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use(irysStorage({
            address: 'https://devnet.irys.xyz',
            providerUrl: connection.rpcEndpoint,
            timeout: 60000,
            identity: wallet, 
        }));

    const { uri } = await metaplex.nfts().uploadMetadata({
        name:truncatedName,
        description,
        image: imageDataUrl,
    });

    return { uri };
}
export async function mintNFT({
  uri,
  name,
  recipient,
}: {
  uri: string;
  name: string;
  recipient: string;
}) {
  const connection = new Connection('https://api.devnet.solana.com');
  const wallet = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(irysStorage());

  const { nft } = await metaplex.nfts().create({
    uri,
    name,
    sellerFeeBasisPoints: 0,
    tokenOwner: new PublicKey(recipient),
  });

  return nft;
}