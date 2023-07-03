// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { Json } from '@metamask/snaps-types';
import {
  ResponseType,
  ErrorType,
  SimulationResponse,
  RecommendedActionType,
  Currency,
  SimulationErrorResponse,
  SimulationMethodType,
} from '../../types/simulateApi';

import { ChainId } from '../../types/chains';
import { fetchTransaction } from '../../http/fetchTransaction';

fetchMock.enableMocks();

describe('fetchTransaction', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const transaction = {
    from: '0x123',
    to: '0xabc',
    method: 'transfer',
    value: '1000',
  } as { [key: string]: Json };

  it('should correctly handle successful responses', async () => {
    const mockResponse: SimulationResponse = {
      recommendedAction: RecommendedActionType.None,
      overviewMessage: 'Transaction successful',
      stateChanges: null,
      addressDetails: {
        address: '0x123',
        addressType: 'contract',
        etherscanVerified: true,
        etherscanLink: 'https://etherscan.io/address/0x123',
      },
      method: SimulationMethodType.EthSendTransaction,
      riskFactors: null,
      gas: {
        gasUsedEth: '0.001',
        fiatValue: '3',
        currency: Currency.USD,
      },
      error: null,
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Success);
    expect(result.simulation).toStrictEqual(mockResponse);
  });

  it('should correctly handle revert error', async () => {
    const mockResponse: SimulationErrorResponse = {
      error: {
        type: ErrorType.Revert,
        message: 'Transaction failed',
        extraData: null,
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Revert);
    expect(result.error).toStrictEqual(mockResponse.error);
  });

  it('should correctly handle unauthorized error', async () => {
    fetchMock.mockResponseOnce('Unauthorized', { status: 403 });

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Errored);
    expect(result.error?.type).toBe(ErrorType.Unauthorized);
    expect(result.error?.message).toBe('Unauthorized');
  });

  it('should correctly handle too many requests error', async () => {
    fetchMock.mockResponseOnce('Too Many Requests', { status: 429 });

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Errored);
    expect(result.error?.type).toBe(ErrorType.TooManyRequests);
    expect(result.error?.message).toBe('TooManyRequests');
  });

  it('should correctly handle general error response from API', async () => {
    const mockResponse: SimulationErrorResponse = {
      error: {
        type: ErrorType.GeneralError,
        message: 'General error',
        extraData: null,
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 });

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Errored);
    expect(result.error).toStrictEqual(mockResponse.error);
  });

  it('should correctly handle unrecognized response from API', async () => {
    fetchMock.mockResponseOnce('Unrecognized response', { status: 200 });

    const result = await fetchTransaction(
      transaction,
      ChainId.EthereumMainnet,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Errored);
    expect(result.error?.type).toBe(ErrorType.UnknownError);
    expect(result.error?.message).toBe('An unknown error occurred');
  });

  it('should return error for unsupported chain', async () => {
    const unsupportedChainId = '999';

    const result = await fetchTransaction(
      transaction,
      unsupportedChainId,
      'metamask',
    );
    expect(result.type).toBe(ResponseType.Errored);
    expect(result.error?.type).toBe(ErrorType.UnknownError);
    expect(result.error?.message).toBe('An unknown error occurred');
  });
});
