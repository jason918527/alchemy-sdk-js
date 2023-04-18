import {
  UserOperation,
  UserOperationReceipt,
  UserOperationRequest
} from '../types/types';
import { AlchemyConfig } from './alchemy-config';

/**
 * The Bundler namespace contains methods used for interacting performing user operations and
 * checking on the state of submitted operations.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.paymaster`.
 */
export class BundlerNamespace {
  /** @internal */
  constructor(private readonly config: AlchemyConfig) {}

  async sendUserOperation(
    userOperation: UserOperationRequest
  ): Promise<string> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_sendUserOperation',
      [userOperation],
      'sendUserOperation'
    );
  }

  async getUserOperationByHash(userOpHash: string): Promise<UserOperation> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_getUserOperationByHash',
      [userOpHash],
      'getUserOperationByHash'
    );
  }

  async supportedEntryPoints(): Promise<string[]> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_supportedEntryPoints',
      [],
      'supportedEntryPoints'
    );
  }

  async getUserOperationReceipt(
    userOpHash: string
  ): Promise<UserOperationReceipt> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_getUserOperationReceipt',
      [userOpHash],
      'getUserOperationReceipt'
    );
  }

  async estimateUserOperationGas(
    userOperation: UserOperationRequest
  ): Promise<string> {
    const provider = await this.config.getProvider();
    return provider._send(
      'eth_estimateUserOperationGas',
      [userOperation],
      'estimateUserOperationGas'
    );
  }
}
