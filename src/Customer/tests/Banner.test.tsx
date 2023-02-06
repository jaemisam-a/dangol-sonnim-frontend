import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Banner from "Customer/components/Banner";

describe("Banner", () => {
  it("renders a banner", () => {
    render(
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "aware-logo" },
        ]}
      />
    );

    const image = document.querySelector("img") as HTMLImageElement;

    expect(image.alt).toBe("aware-logo");
    expect(image.src).toContain("https://aware.brownbag.one/images/aware/aware-logo.png");
  });
});
