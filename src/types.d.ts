declare module "*.module.scss" {
	const classNames: Record<string, string>;
	export = classNames;
}

declare module "*.svg" {
	const value: any;
	export = value;
}
