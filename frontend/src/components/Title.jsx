import TagLine from "./Tagline";

const Title = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto  text-black lg:mb-12 md:text-center`}
    >
      {tag && <TagLine className="mb-2 text-black font-semibold md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 mt-2 text-black">{text}</p>}
    </div>
  );
};

export default Title;
