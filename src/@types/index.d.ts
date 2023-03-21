declare module "*.svg" {
  // fixes SVG imports: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
