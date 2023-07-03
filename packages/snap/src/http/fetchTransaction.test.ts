// import { EthereumMainnetMockSuccessResponse } from '../mocks/MockEthereumResponses';
// import { ChainId } from '../types/chains';
// import { ResponseType, SimulationMethodType } from '../types/simulateApi';
// import { fetchTransaction } from './fetchTransaction';

// TODO: Try and get this working

// describe('fetchTransaction', () => {
//   it('should fetch successfully', async () => {
//     // global.fetch = jest.fn((input: RequestInfo | URL, init: RequestInit | undefined): Promise<any> => Promise.resolve({
//     //   json: () => Promise.resolve(EthereumMainnetMockSuccessResponse),
//     //   status: 200,
//     // }));

//     const spy = jest.spyOn(global, 'fetch').mockImplementationOnce(
//       (): Promise<any> =>
//         Promise.resolve({
//           json: () => Promise.resolve(EthereumMainnetMockSuccessResponse),
//           status: 200,
//         }),
//     );
//     // const spy = jest.spyOn(global, 'fetch').mockImplementationOnce(
//     //   (): Promise<any> =>
//     //     Promise.resolve({
//     //       json: () => Promise.resolve(EthereumMainnetMockSuccessResponse),
//     //       status: 200,
//     //     }),
//     // );

//     // 'https://api.walletguard.app/snaps/v0/eth/mainnet/transaction',
//     // {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify(simulateRequest),
//     // }),

//     const transaction = {
//       from: '0x123',
//       to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
//       method: SimulationMethodType.EthSendTransaction,
//       data: '0x123445679',
//       value: '0x0',
//     };

//     const response = await fetchTransaction(
//       transaction,
//       ChainId.EthereumMainnet,
//       'https://dashboard.walletguard.app',
//     );

//     expect(response.type).toStrictEqual(ResponseType.Success);
//     expect(spy).toHaveBeenCalled();
//   });
// });
