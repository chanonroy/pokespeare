import fetch from "node-fetch";

// https://pokeapi.co/docs/v2#pokemon-species
interface PokemonApiResponse {
  status: number;
  body: {
    id?: string;
    flavor_text_entries?: [{ flavor_text: string; language: { name: string } }];
    names?: [{ language: { name: string }; name: string }];
  };
}

export class PokemonNotFoundError extends Error {}

export const getPokemonFromName = async (
  name: string
): Promise<PokemonApiResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 404) {
    throw new PokemonNotFoundError();
  }

  if (response.status !== 200) {
    throw new Error("An error has occurred");
  }

  return {
    status: response.status,
    body: JSON.parse((await response.text()) as any),
  };
};

export const parsePokemonInfo = (
  response: PokemonApiResponse
): {
  id: string | undefined;
  description: string | undefined;
  name: string | undefined;
} => {
  const { id, flavor_text_entries, names } = response.body;

  return {
    id: id?.toString() ?? "",
    description:
      flavor_text_entries
        ?.find((item: any) => item.language.name === "en")
        ?.flavor_text.replace(/\n|\r|\f/g, " ") ?? "",
    name: names?.find((item) => item.language.name === "en")?.name ?? "",
  };
};
