export default function TitleH1(props: { children: React.ReactNode }) {
  return (
    <h1
      className="
        !text-4xl
        !font-extrabold
        mt-6 mb-4
      "
    >
      {props.children}
    </h1>
  );
}
