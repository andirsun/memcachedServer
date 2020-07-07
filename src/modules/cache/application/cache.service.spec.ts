import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should return a hello workd', () => {
    expect(service.getHello()).toEqual('Hello World!');
  });
  
  describe('Cache Functions', () => {
    //Testing a set key function
    it('Should return a true if the object was saved', async () => {
      const result = true;
      //jest.spyOn(service, 'Cache Functions').mockImplementation(() => result);
      expect(await service.setKey("nombre","Anderson Laverde",3600)).toBe(result);
    });
    // Testing a get ket value function
    it('Should return a value of a object', async () => {
      const result = "Anderson Laverde";
      //jest.spyOn(service, 'Cache Functions').mockImplementation(() => result);
      expect(await service.getKeyValue("nombre")).toBe(result);
    });
    //
    it('Should return a full object stored in memory', async () => {
      const result = 'Anderson Laverde'
      //jest.spyOn(service, 'Cache Functions').mockImplementation(() => result);
      service.getsKeyValue("nombre")
        .then(response =>{
          expect(response["nombre"]).toBe('Anderson Laverde');  
          expect(typeof response.cas).toBe("string") ;
        });
    });
  });
});
