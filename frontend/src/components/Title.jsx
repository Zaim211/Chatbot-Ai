import TagLine from "./Tagline";

const Title = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto  lg:mb-12 md:text-center`}
    >
      {tag && <TagLine className="mb-2 h1 font-bold text-lg text-[#b1e2be] md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 mt-2 ">{text}</p>}
    </div>
  );
};

export default Title;
