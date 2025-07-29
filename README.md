## 🖼️ NFT Marketplace 

A decentralized NFT Marketplace built with **React**, **Tailwind CSS**, and **Solidity**, enabling users to **mint**, **buy**, and **sell** NFTs on the blockchain. Designed with modular components and responsive layouts for a seamless user experience.

---

## 🚀 Features

- **NFT Minting**: Users can create unique NFTs with metadata and images.
- **Marketplace Listing**: NFTs can be listed for sale with custom pricing.
- **Wallet Integration**: Connects to MetaMask for secure transactions.
- **Dynamic UI**: Real-time updates on NFT status, ownership, and bids.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

| Layer        | Technologies Used                          |
|--------------|---------------------------------------------|
| Frontend     | React, Tailwind CSS, Vite                   |
| Smart Contracts | Solidity, Hardhat                        |
| Blockchain   | Ethereum (Testnet or Localhost)             |
| Wallet       | MetaMask                                    |
| Deployment   | Vercel / Localhost                          |

---

## 📁 Project Structure

```
NFT-Marketplace/
├── src/
│   ├── components/        # Reusable UI components (Navbar, Hero, NFTCard, etc.)
│   ├── pages/             # Main views (Home, Marketplace, Profile)
│   ├── assets/            # Images and icons
│   ├── styles/            # Tailwind config and custom styles
│   └── App.jsx            # Root component
├── contracts/             # Solidity smart contracts
├── scripts/               # Deployment and interaction scripts
├── README.md              # Project documentation
└── package.json           # Dependencies and scripts
```

---

## 🧠 Smart Contract Overview

- **NFT.sol**: ERC-721 compliant contract for minting NFTs.
- **Marketplace.sol**: Handles listing, buying, and transferring NFTs.
- **Security**: Includes checks for ownership, price validation, and reentrancy protection.

---

## 🖥️ UI Highlights

- **Hero Section**: Bold intro with call-to-action for minting or browsing NFTs.
- **NFT Cards**: Display image, title, creator, price, and bid button.
- **Filters**: Sort by category, price, or ownership.
- **Wallet Status**: Shows connected address and ETH balance.

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Runavphate/NFT-Marketplace
cd NFT-Marketplace
npm install
npm run dev
```

Make sure MetaMask is connected to your local Hardhat network or testnet.

---

## 🧱 Deployment Notes

- Contracts deployed via Hardhat.
- Frontend hosted on Vercel or localhost.
- Environment variables stored in `.env.local`.

---

## 📌 Future Improvements

- Add support for lazy minting and royalties.
- Integrate IPFS for decentralized media storage.
- Enable bidding and auction features.
- Expand to Polygon or other EVM-compatible chains.
