function SectionMarker({ margin = 40, id }: { margin?: number; id: string }) {
  return (
    <div className=" w-full h-2 relative">
      <div
        style={{
          top: -(margin),
        }}
        className="w-[20px] h-[20px]  absolute"
        id={id}
      ></div>
    </div>
  );
}

export default SectionMarker;
