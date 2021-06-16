import { mocked } from "ts-jest/utils";
import { getPokemonFromName, parsePokemonInfo } from "../services/pokemon-api";
import { PokemonResolver } from "./PokemonResolver";

jest.mock("../services/pokemon-api");

describe("PokemonResolver", () => {
  it("returns a valid pokemon search", async () => {
    const resultMock = {
      id: "132",
      description:
        "It can freely recombine its own cellular structure to transform into other life-forms.",
      name: "Ditto",
    };

    // mock api call
    mocked(getPokemonFromName).mockReturnValueOnce({} as any);
    mocked(parsePokemonInfo).mockReturnValueOnce(resultMock);

    const resolver = new PokemonResolver();
    const result = await resolver.searchPokemon("ditto");

    expect(result).toEqual(resultMock);
  });
  it("handles error with pokemon api", async () => {
    // mock api call
    mocked(getPokemonFromName).mockRejectedValueOnce(
      new Error("An error has occurred")
    );

    const resolver = new PokemonResolver();
    expect(async () => await resolver.searchPokemon("ditto")).rejects.toThrow();
  });
  it.todo("handles error with shakespeare api");
});
