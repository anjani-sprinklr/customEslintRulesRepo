
import '@testing-library/jest-dom';
import * as var1 from "./src/useUserQuery";
import var2 from "useWolverineMutation";
import var3 from "@apollo/client";
const var4 = require("../files/DontUnderEstimatePowerOfCommon/useElectionQuery");
const var5 = require("useNitishToModiMutation");

// Mocking use..Query
jest.mock("./files/useStocksQuery", () => ({
  useQueryTest: jest.fn()
}));

//mocking useQuery custom hook from the 2nd argument
jest.mock("./somefile", () => ({
  useTest: jest.fn(),
  usesomeQuery: jest.fn()
}))

// mocking useMutation from the 2nd argument
jest.mock("./somefile", () => ({
  useTest: jest.fn(),
  usesomeQuery2: jest.fn(),
  useDesMutation:jest.fn()
}))


// Mocking @apollo/clinet
jest.mock("@apollo/client", () => ({
  useTestMutation: jest.fn()
}));

// Mocking use...Mutation
jest.doMock("./useTarnsformersMutation");


// Spying on import from use...Query
jest.spyOn(var1);

// Spying on require('use...Mutation');
jest.spyOn(require("useSpideyMutation"));

// Spying on import from use...Mutation
jest.spyOn(var2, 'useThisMethod');

// Spying on import from '@apollo/client'
jest.spyOn(var3);

// Spying on use...Query from require throgh Variable Declaration
jest.spyOn(var4);

// Spying on use...Mutation from require through varibale declaration
jest.spyOn(var5, 'noDoMethod');

