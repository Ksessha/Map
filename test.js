const ErrorRepository = require('./ErrorRepository');

describe('ErrorRepository', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
    errorRepo.addError(404, 'Not Found');
    errorRepo.addError(500, 'Internal Server Error');
    errorRepo.addError(403, 'Forbidden');
  });

  test('should return correct error description for existing code', () => {
    expect(errorRepo.translate(404)).toBe('Not Found');
    expect(errorRepo.translate(500)).toBe('Internal Server Error');
    expect(errorRepo.translate(403)).toBe('Forbidden');
  });

  test('should return "Unknown error" for non-existent code', () => {
    expect(errorRepo.translate(401)).toBe('Unknown error');
    expect(errorRepo.translate(0)).toBe('Unknown error');
    expect(errorRepo.translate(-1)).toBe('Unknown error');
    expect(errorRepo.translate(999)).toBe('Unknown error');
  });

  test('should handle empty repository', () => {
    const emptyRepo = new ErrorRepository();
    expect(emptyRepo.translate(404)).toBe('Unknown error');
  });

  test('should allow adding new errors dynamically', () => {
    errorRepo.addError(400, 'Bad Request');
    expect(errorRepo.translate(400)).toBe('Bad Request');
  });
});