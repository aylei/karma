import React from "react";

import { shallow } from "enzyme";

import { AlertStore } from "Stores/AlertStore";

import { BaseLabel } from ".";

let alertStore;

beforeEach(() => {
  alertStore = new AlertStore([]);
});

const FakeBaseLabel = () => {
  // BaseLabel doesn't implement render since it's an abstract component
  // Add a dummy implementation for testing
  class RenderableBaseLabel extends BaseLabel {
    render() {
      return null;
    }
  }
  return shallow(
    <RenderableBaseLabel alertStore={alertStore} name="foo" value="bar" />
  );
};

describe("<BaseLabel />", () => {
  it("isStaticColorLabel() returns true for labels present in staticColorLabels", () => {
    alertStore.settings.values.staticColorLabels = ["foo", "job", "bar"];
    const instance = FakeBaseLabel().instance();
    expect(instance.isStaticColorLabel("job")).toBeTruthy();
  });

  it("isStaticColorLabel() returns false for labels not present in staticColorLabels", () => {
    alertStore.settings.values.staticColorLabels = ["foo"];
    const instance = FakeBaseLabel().instance();
    expect(instance.isStaticColorLabel("job")).toBeFalsy();
  });

  it("getColorClass() on a label included in staticColorLabels should return 'info'", () => {
    alertStore.settings.values.staticColorLabels = ["job"];
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorClass("job", "foo")).toBe("info");
  });

  it("getColorClass() on a label without any special color should return 'warning'", () => {
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorClass("foo", "bar")).toBe("warning");
  });

  it("getColorClass() on 'alertname' label should return 'dark'", () => {
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorClass("alertname", "foo")).toBe("dark");
  });

  it("getColorStyle() on a label included in staticColorLabels should be empty", () => {
    alertStore.settings.values.staticColorLabels = ["job"];
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorStyle("job", "bar")).toMatchObject({});
  });

  it("getColorStyle() on a label without any color information should be empty", () => {
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorStyle("foo", "bar")).toMatchObject({});
  });

  it("getColorStyle() on a label with dark background color should have a bright font", () => {
    alertStore.data.colors["foo"] = {
      bar: {
        brightness: 125,
        background: { red: 4, green: 5, blue: 6, alpha: 200 }
      }
    };
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorStyle("foo", "bar")).toMatchObject({
      color: "rgba(255, 255, 255, 255)",
      backgroundColor: "rgba(4, 5, 6, 200)"
    });
  });

  it("getColorStyle() on a label with bright background color should have a dark font", () => {
    alertStore.data.colors["foo"] = {
      bar: {
        brightness: 200,
        background: { red: 4, green: 5, blue: 6, alpha: 200 }
      }
    };
    const instance = FakeBaseLabel().instance();
    expect(instance.getColorStyle("foo", "bar")).toMatchObject({
      color: "rgba(44, 62, 80, 255)",
      backgroundColor: "rgba(4, 5, 6, 200)"
    });
  });
});
