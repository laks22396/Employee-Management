import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>Employee Management App</title>
			</Head>
			{children}
		</main>
	);
}
