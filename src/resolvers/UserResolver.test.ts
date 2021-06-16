describe("UserResolver", () => {
  describe("signUp()", () => {
    it.todo("creates a new user and returns an accessToken");
    it.todo("throws error when a user already exists");
  });
  describe("login()", () => {
    it.todo("returns accessToken when user exists and credentials are valid");
    it.todo("throws a generic error when user does not exist");
    it.todo("throws a generic error when passwords are invalid");
  });
  describe("savePokemon()", () => {
    it.todo("creates a pokemon record when it does not exist while saving");
    it.todo("returns the pokemon if it is already saved");
    it.todo("pushes to the list of pokemon if saved pokemon already exist");
  });
  describe("unsavePokemon()", () => {
    it.todo("removes pokemon from a user's saved list");
  });
});
