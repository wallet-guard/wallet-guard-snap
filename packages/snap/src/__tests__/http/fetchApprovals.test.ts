import { ApprovalNotification } from '../../types/approvalsApi';
import { fetchApprovals } from '../../http/fetchApprovals'; // replace with actual import

jest.mock('../../utils/environment', () => ({
  SERVER_BASE_URL: 'https://api.example.com',
}));

describe('fetchApprovals', () => {
  const walletAddress = '0x123';
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it('should return the approval notification for successful requests', async () => {
    const mockResponse: ApprovalNotification = {
      openApprovals: 5,
      highRiskApprovals: 2,
      fiatValueAtRisk: '500.00',
      currency: 'USD',
    };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as any);

    const approvalNotification = await fetchApprovals(walletAddress);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.example.com/v0/approvals/notifications?address=${walletAddress}`,
    );
    expect(approvalNotification).toStrictEqual(mockResponse);
  });

  it('should return null for failed requests', async () => {
    mockFetch.mockRejectedValueOnce('API is down');

    const approvalNotification = await fetchApprovals(walletAddress);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.example.com/v0/approvals/notifications?address=${walletAddress}`,
    );
    expect(approvalNotification).toBeNull();
  });
});
