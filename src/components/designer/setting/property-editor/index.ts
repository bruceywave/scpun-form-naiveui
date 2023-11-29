let comps = {};

const modules = import.meta.glob("./**/*.vue", { eager: true }) as any;
for (const path in modules) {
	let cname = modules[path].default.name;
	comps[cname] = modules[path].default;
}
export default comps;
