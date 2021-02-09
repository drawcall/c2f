const toDecorationImage = (val, decls) => {
  val += "";
  val = val.replace(/^url\(/g, "").replace(/\)$/g, "");

  const size = decls.getVal("background-size", "cover");
  const repeat = decls.getVal("background-repeat", "no-repeat");

  return `
new DecorationImage(
  image: new ExactAssetImage('${val}'),
  fit: BoxFit.${size},
  repeat: ImageRepeat.${repeat},
)`.trim();
};

export default toDecorationImage;
