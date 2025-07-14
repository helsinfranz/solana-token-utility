// -> package.json

/*
{
  "name": "solana-app",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@solana/spl-token": "^0.4.13",
    "@solana/wallet-adapter-base": "^0.9.26",
    "@solana/wallet-adapter-phantom": "^0.9.27",
    "@solana/wallet-adapter-react": "^0.15.38",
    "@solana/wallet-adapter-react-ui": "^0.9.38",
    "@solana/web3.js": "^1.98.2",
  },
}
*/

// -> Solana Provider File:

"use client";

import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

export function SolanaProvider({ children }) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

// -> Main Layout File

import { AppProvider } from "@/context/app-context"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaProvider } from "@/components/solana-provider"

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <SolanaProvider>
                        <AppProvider>
                            <div className="flex flex-col min-h-screen relative">
                                {children}
                            </div>
                        </AppProvider>
                    </SolanaProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}