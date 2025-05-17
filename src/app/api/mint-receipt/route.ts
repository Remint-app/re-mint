import { NextResponse, NextRequest } from 'next/server';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const PINATA_JWT = process.env.PINATA_JWT!;

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl, name, description, recipient } = await req.json();
   
    const { uri } = await uploadToPinata({
      name,
      description,
      imageDataUrl
    });

    console.log('Metadata URI:', uri);
    
    const nft = await mintNFT({
      uri,
      name,
      recipient,
    });

    return NextResponse.json({
      success: true,
      nft,
      metadataUri: uri
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function uploadToPinata({
  name,
  description,
  imageDataUrl
}: {
  name: string;
  description: string;
  imageDataUrl: string;
}) {
  try {
    
    const imageBlob = await (await fetch(imageDataUrl)).blob();
    const imageFile = new File([imageBlob], 'receipt.png', { type: 'image/png' });

    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
      wrapWithDirectory: false
    });
    imageFormData.append('pinataOptions', pinataOptions);

    const imageResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: imageFormData
    });

    if (!imageResponse.ok) {
      const error = await imageResponse.json();
      throw new Error(error.error?.details || 'Failed to upload image to Pinata');
    }

    const imageData = await imageResponse.json();
    const imageUri = `https://gateway.pinata.cloud/ipfs/${imageData.IpfsHash}`;

    
    const metadata = {
      name: name.substring(0, 32),
      description,
      image: imageUri,
      attributes: [],
      properties: {
        files: [{
          uri: imageUri,
          type: 'image/png'
        }]
      }
    };

    const metadataResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(metadata)
    });

    if (!metadataResponse.ok) {
      const error = await metadataResponse.json();
      throw new Error(error.error?.details || 'Failed to upload metadata to Pinata');
    }

    const metadataData = await metadataResponse.json();
    const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataData.IpfsHash}`;

    return { uri: metadataUri };
  } catch (error) {
    console.error('Pinata upload error:', error);
    throw new Error('Failed to upload to Pinata');
  }
}

async function mintNFT({
  uri,
  name,
  recipient,
}: {
  uri: string;
  name: string;
  recipient: string;
}) {
  const connection = new Connection('https://api.devnet.solana.com',{
    commitment: 'confirmed'
  });
  const wallet = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet));

  try {
    const { nft } = await metaplex.nfts().create({
      uri,
      name: name.substring(0, 32),
      sellerFeeBasisPoints: 0,
      tokenOwner: new PublicKey(recipient),
    });

    console.log('NFT minted successfully:', nft.mint.address.toString());
    return {
      mintAddress: nft.mint.address.toString(),
      metadataUri: uri
    };
  } catch (error) {
    console.error('Minting error:', error);
    throw error;
  }
}