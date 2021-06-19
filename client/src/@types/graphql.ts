/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SavePokemon
// ====================================================

export interface SavePokemon_savePokemon_pokemon {
  __typename: "Pokemon";
  id: string;
  name: string;
  description: string;
}

export interface SavePokemon_savePokemon {
  __typename: "User";
  id: string;
  pokemon: SavePokemon_savePokemon_pokemon[] | null;
}

export interface SavePokemon {
  /**
   * Add pokemon to the user's saved list
   */
  savePokemon: SavePokemon_savePokemon;
}

export interface SavePokemonVariables {
  id: string;
  name: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnsavePokemon
// ====================================================

export interface UnsavePokemon_unsavePokemon_pokemon {
  __typename: "Pokemon";
  id: string;
  name: string;
  description: string;
}

export interface UnsavePokemon_unsavePokemon {
  __typename: "User";
  id: string;
  pokemon: UnsavePokemon_unsavePokemon_pokemon[] | null;
}

export interface UnsavePokemon {
  /**
   * Remove pokemon from the user's saved list
   */
  unsavePokemon: UnsavePokemon_unsavePokemon;
}

export interface UnsavePokemonVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPokemon
// ====================================================

export interface SearchPokemon_searchPokemon {
  __typename: "Pokemon";
  id: string;
  name: string;
  description: string;
}

export interface SearchPokemon {
  searchPokemon: SearchPokemon_searchPokemon[];
}

export interface SearchPokemonVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserQuery
// ====================================================

export interface GetUserQuery_me_pokemon {
  __typename: "Pokemon";
  id: string;
  name: string;
  description: string;
}

export interface GetUserQuery_me {
  __typename: "User";
  id: string;
  emailAddress: string;
  pokemon: GetUserQuery_me_pokemon[] | null;
}

export interface GetUserQuery {
  /**
   * Get the current user
   */
  me: GetUserQuery_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_user {
  __typename: "User";
  id: string;
  emailAddress: string;
}

export interface LoginMutation_login {
  __typename: "LoginOutput";
  user: LoginMutation_login_user;
  accessToken: string;
}

export interface LoginMutation {
  /**
   * Use email and password to receive an accessToken
   */
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  emailAddress: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpMutation
// ====================================================

export interface SignUpMutation_signUp_user {
  __typename: "User";
  id: string;
  emailAddress: string;
}

export interface SignUpMutation_signUp {
  __typename: "LoginOutput";
  user: SignUpMutation_signUp_user;
  accessToken: string;
}

export interface SignUpMutation {
  /**
   * Create new user and return an accessToken
   */
  signUp: SignUpMutation_signUp;
}

export interface SignUpMutationVariables {
  emailAddress: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
