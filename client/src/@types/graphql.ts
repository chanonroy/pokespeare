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
