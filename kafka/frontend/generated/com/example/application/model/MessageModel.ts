// @ts-nocheck

import Message from './Message';

import {ObjectModel,StringModel,NumberModel,ArrayModel,BooleanModel,Required,ModelValue,_getPropertyModel} from '@hilla/form';

import {Email,Null,NotNull,NotEmpty,NotBlank,AssertTrue,AssertFalse,Negative,NegativeOrZero,Positive,PositiveOrZero,Size,Past,Future,Digits,Min,Max,Pattern,DecimalMin,DecimalMax} from '@hilla/form';

/**
 * This module is generated from com.example.application.model.Message.
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///D:/master/sem3/UBB_SE_Sem3_SOA/kafka/src/main/java/com/example/application/model/Message.java}
 */
export default class MessageModel<T extends Message = Message> extends ObjectModel<T> { 
  declare static createEmptyValue: () => Message;

  get text(): StringModel {
    return this[_getPropertyModel]('text', StringModel, [false]);
  }

  get time(): StringModel {
    return this[_getPropertyModel]('time', StringModel, [true]);
  }

  get userName(): StringModel {
    return this[_getPropertyModel]('userName', StringModel, [false]);
  }
}
