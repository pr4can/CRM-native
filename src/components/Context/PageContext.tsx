import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface WindowSize {
	width: number;
	height: number;
}

interface PageContextProps {
	windowSize: WindowSize;
}

export const PageContext = createContext<PageContextProps>({
	windowSize: {
		width: window.innerWidth,
		height: window.innerHeight,
	},
});

interface ContextProviderProps {
	children?: ReactNode;
}

export const PageProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const updateSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	return <PageContext.Provider value={{ windowSize }}>{children}</PageContext.Provider>;
};

const usePage = () => useContext<PageContextProps>(PageContext);

export default usePage;
