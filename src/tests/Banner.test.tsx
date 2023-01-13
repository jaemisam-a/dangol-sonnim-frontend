import { render } from "@testing-library/react";
import Banner from "components/Banner";
import "@testing-library/jest-dom";

describe("Banner", () => {
  it("renders a banner", () => {
    render(
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "aware-logo" },
        ]}
        height={"200px"}
      />
    );

    const image = document.querySelector("img") as HTMLImageElement;

    expect(image.alt).toBe("aware-logo");
    expect(image.src).toContain(
      "https%3A%2F%2Faware.brownbag.one%2Fimages%2Faware%2Faware-logo.png"
    );
  });
});
