import * as formValidator from '../../utils/formValidators.util';

describe('Not Empty String', () => {
  it('Empty string', () => {
    expect(formValidator.isNotEmpty('')).toBe(false);
  });
  it('Normal string ', () => {
    expect(formValidator.isNotEmpty('abcdef')).toBe(true);
  });
  it('Unicode string', () => {
    expect(formValidator.isNotEmpty('åπø')).toBe(true);
  });
  it('Null argument', () => {
    expect(formValidator.isNotEmpty(null)).toBe(false);
  });
});

describe('String with Number Only', () => {
  it('Empty string', () => {
    expect(formValidator.hasNumberOnly('')).toBe(false);
  });
  it('Normal string with Number Only', () => {
    expect(formValidator.hasNumberOnly('012345')).toBe(true);
  });
  it('String with only 0', () => {
    expect(formValidator.hasNumberOnly('0')).toBe(true);
  });
  it('String with character and number', () => {
    expect(formValidator.hasNumberOnly('O123')).toBe(false);
  });

  it('String with overflow number value in JS', () => {
    expect(formValidator.hasNumberOnly('9007199254740992')).toBe(true);
  });
});

describe('String With ASCII Character Only', () => {
  it('Empty string', () => {
    expect(formValidator.isASCIIString('')).toBe(true);
  });
  it('Normal String With ASCII Character Only', () => {
    expect(formValidator.isASCIIString('Abc3431;S')).toBe(true);
  });
  it('String With Unicode Charater', () => {
    expect(formValidator.isASCIIString('Xin chào')).toBe(false);
  });
});

describe('Check If 2 Form Fields Have The Same Value', () => {
  it('Two empty string', () => {
    expect(formValidator.isFieldValueMatch('', '')).toBe(true);
  });
  it('Two string not equal', () => {
    expect(formValidator.isFieldValueMatch('abc', 'def')).toBe(false);
  });
  it('Two string equal', () => {
    expect(formValidator.isFieldValueMatch('abc', 'abc')).toBe(true);
  });
  it('Two Unicode String Equal', () => {
    expect(formValidator.isFieldValueMatch('Xin chào', 'Xin chào')).toBe(true);
  });
});

describe('Check If There is HTML Code in string', () => {
  it('Empty string', () => {
    expect(formValidator.hasHTMLCode('')).toBe(false);
  });
  it('String with html tag - Singular', () => {
    expect(formValidator.hasHTMLCode('<img alt="abc" src="def" /> hello')).toBe(
      true
    );
  });
  it('String with html tag - Paired', () => {
    expect(formValidator.hasHTMLCode('<a>Link to Home</a>')).toBe(true);
  });
  it('String with html tag - Script tag', () => {
    expect(
      formValidator.hasHTMLCode('<script>console.log("hello")</script>')
    ).toBe(true);
  });
  it('String with open html tag only', () => {
    expect(formValidator.hasHTMLCode('<script>console.log("hello")')).toBe(
      true
    );
  });
});

describe('Remove HTML Code From String', () => {
  it('Empty string', () => {
    expect(formValidator.removeHTMLCode('')).toBe('');
  });
  it('String with html tag - Singular', () => {
    expect(
      formValidator.removeHTMLCode('<img alt="abc" src="def" />hello')
    ).toBe('hello');
  });
  it('String with html tag - Paired', () => {
    expect(formValidator.removeHTMLCode('<a>Link to Home</a>')).toBe(
      'Link to Home'
    );
  });
  it('String with html tag - Script tag', () => {
    expect(
      formValidator.removeHTMLCode('<script>console.log("hello")</script>')
    ).toBe('console.log("hello")');
  });
  it('String with open html tag only', () => {
    expect(formValidator.removeHTMLCode('<script>console.log("hello")')).toBe(
      'console.log("hello")'
    );
  });
});

describe('Has Exact Length', () => {
  it('Have Exact Length', () => {
    expect(formValidator.hasExactLength('abcde', 5)).toBe(true);
  });
  it('Not Have Exact Length', () => {
    expect(formValidator.hasExactLength('abcdefeg', 5)).toBe(false);
  });
});

describe('At Least Length', () => {
  it('At Least Length: 6', () => {
    expect(formValidator.hasEqLongerLength('abcde', 6)).toBe(false);
  });
  it('At Least Length: 6', () => {
    expect(formValidator.hasEqLongerLength('abcdeeg', 6)).toBe(true);
  });
});

describe('Not exceed Length', () => {
  it('Exceed Length: 6', () => {
    expect(formValidator.hasEqShorterLength('abcdftre', 6)).toBe(false);
  });
  it('Not Exceed Length: 6', () => {
    expect(formValidator.hasEqShorterLength('abc', 6)).toBe(true);
  });
});

describe('Combine Validator - Valid All', () => {
  it('All Validator Valid', () => {
    expect(
      formValidator.isEveryValidatorPassed(
        formValidator.isNotEmpty('012345'),
        formValidator.hasExactLength('012345', 6),
        formValidator.hasNumberOnly('012345')
      )
    ).toBe(true);
  });

  it('One validator Fail', () => {
    expect(
      formValidator.isEveryValidatorPassed(
        formValidator.isNotEmpty('012345'),
        formValidator.hasExactLength('012345', 3),
        formValidator.hasNumberOnly('012345')
      )
    ).toBe(false);
  });
});

describe('Combine Validator - Only Some Valid', () => {
  it('All Validators Fail', () => {
    expect(
      formValidator.isSomeValidatorPassed(
        formValidator.isEveryValidatorPassed(
          formValidator.isNotEmpty(''),
          formValidator.hasExactLength('', 6),
          formValidator.hasNumberOnly('')
        )
      )
    ).toBe(false);
  });
  it('One Validator Pass', () => {
    expect(
      formValidator.isSomeValidatorPassed(
        formValidator.isNotEmpty('abc'),
        formValidator.hasExactLength('', 6),
        formValidator.hasNumberOnly('')
      )
    ).toBe(true);
  });
});
