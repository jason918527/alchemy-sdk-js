import {
  PaymasterDataResponse,
  PaymasterRequestUserOperation
} from '../types/types';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Paymaster namespace contains methods used for sending paymaster operations and
 * checking on the state of submitted operations.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.paymaster`.
 */
export class PaymasterNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  /**
   * Used to get the the paymasterAndData for the sponsorship with the alchemy paymaster.
   *
   * Requests sponsorship for a UserOperation. Returns paymasterAndData
   * if approved, errors if not.
   *
   * @param policyId The policy ID used for the sponsorship
   * @param entryPointAddress The entry point address of the paymasterAndData approval
   * @param paymasterTrackedSenderNonce The paymaster tracked sender nonce,
   * unique for each sender and incremental
   * @param userOperation Partial UserOperation object, missing paymasterAndData
   * and signature fields
   */
  async requestPaymasterAndData(
    policyId: string,
    entryPoint: string,
    paymasterTrackedSenderNonce: number,
    userOperation: PaymasterRequestUserOperation
  ): Promise<PaymasterDataResponse> {
    const provider = await this.config.getProvider();
    return provider._send(
      'alchemy_requestPaymasterAndData',
      [
        {
          policyId,
          paymasterTrackedSenderNonce,
          entryPoint,
          userOperation
        }
      ],
      'requestPaymasterAndData'
    );
  }
}
