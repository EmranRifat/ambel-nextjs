import Dropdown from "../../Dropdown";

const ChartPreview = (chartItem) => {
  return (<div className="p-5 w-full flex flex-col">
    {chartItem?.entries?.map((entry, idx) => {
      switch (entry.type) {
        case "dropdown":
          return (
            <Dropdown
              key={idx}
              items={entry?.data?.listItem ?? []}
              selected={entry?.data?.prompt ?? ""}
              onSelected={(item) => {
                // console.log(item);
              }}
              width={"948px"}
            />
          );

        case "text":
          return (
            <label>
              <input
                key={idx}
                type="text"
                name={entry.name}
                className="border"
              />
              ;{entry.title}
            </label>
          );

        case "heading":
          return (
            <div
              dangerouslySetInnerHTML={{ __html: entry.heading }}
              className="py-1 text-2xl"
            />
          );
        case "info":
          return (
            <div
              dangerouslySetInnerHTML={{ __html: entry.text }}
              className="py-2"
            />
          );
        case "note":
          return (
            <div
              dangerouslySetInnerHTML={{ __html: entry.text }}
              className="py-2"
            />
          );
        default:
          return <></>;
      }
    })}
  </div>)
}

export default ChartPreview;