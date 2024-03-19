import { ProfeValidatorsDirective } from './profe-validator.directive';
import { MessageService } from '../../services/message/message.service';
import { Inject } from '@angular/core';

describe('ProfeValidatorDirective', () => {
  var ms = Inject(MessageService);
  it('should create an instance', () => {
    const directive = new ProfeValidatorsDirective(ms);
    expect(directive).toBeTruthy();
  });
});
