/**
 * This module is generated from MessageEndpoint.java
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///D:/master/sem3/UBB_SE_Sem3_SOA/kafka/src/main/java/com/example/application/MessageEndpoint.java}
 * @module MessageEndpoint
 */

// @ts-ignore
import client from './connect-client.default';
// @ts-ignore
import { EndpointRequestInit, Subscription } from '@hilla/frontend';

import type Message from './com/example/application/model/Message';

function _join(
): 
Subscription<Message | undefined>
{
  return client.subscribe('MessageEndpoint', 'join',{});
}

function _send(
 message: Message | undefined,
 __init?: EndpointRequestInit
): Promise<void>
{
 return client.call('MessageEndpoint', 'send', {message}, __init);
}
export {
  _join as join,
  _send as send,
};
