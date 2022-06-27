import { render, screen } from "@testing-library/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CreateGame from "../components/CreateGame/CreateGame";

describe("Formulario Videogames", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateGame />
        </BrowserRouter>
      </Provider>
    );
  });
  it("El formulario debe contener un input Nombre", () => {
    const element = screen.getByPlaceholderText("Name");
    expect(element.type).toBe("text");
  });

  it("El formulario debe contener un input Description", () => {
    const element = screen.getByPlaceholderText("Description");
    expect(element.type).toBe("textarea");
  });

  it("El formulario debe contener un input Image", () => {
    const element = screen.getByPlaceholderText("Image URL");
    expect(element.type).toBe("text");
  });

  it("El formulario debe contener un input Rating", () => {
    const element = screen.getByPlaceholderText("0");
    expect(element.type).toBe("number");
  });
});
