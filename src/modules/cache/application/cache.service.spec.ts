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
    
    //Testing a return full object with key and cas propertie
    it('Should return a full object stored in memory', async () => {
      const result = 'Anderson Laverde'
      //jest.spyOn(service, 'Cache Functions').mockImplementation(() => result);
      await service.getsKeyValue("nombre")
        .then(response =>{
          //Testing the propertie of returned object
          expect(response["nombre"]).toBe('Anderson Laverde'); 
          //Testing a type of "cas" propertie 
          expect(typeof response.cas).toBe("string") ;
        });
    });
    
    //testing a replace value of object
    it('Should return a true if the value was changed', async () => {
      const result = true;
      //jest.spyOn(service, 'Cache Functions').mockImplementation(() => result);
      expect(await service.replaceValueofKey('nombre','Anderson Laverde Gracia',4000)).toBe(result);
    });
    
    // Testing to append a value to sved object
    it('Should return a concatenated string over past value of saved key', async () => {
      //First step : get current value of key
      const result = await service.getKeyValue('nombre');
      // second step : append value '123' to the key
      let response = await service.appendValueToKey('nombre','123');
      // if the second step was succesfully
      if(response){
        // thirth step check new value must to be oldValue + '123'
        service.getKeyValue("nombre")
          .then(newValue => {      
            //test new concatenated string
            expect(newValue).toBe(result+'123');
          });
      }
    });
    
    // Testing to preprend a value to saved object
    it('Should return a concatenated string (at the begin) over past value of saved key', async () => {
      //First step : get current value of key
      const result = await service.getKeyValue('nombre');
      // second step : append value '123' to the key
      let response = await service.prependValueToKey('nombre','123');
      // if the second step was succesfully
      if(response){
        // thirth step check new value must to be '123'+ oldValue
        service.getKeyValue("nombre")
          .then(newValue => {      
            //test new concatenated string
            expect(newValue).toBe('123'+result);
          });
      }
    });

      
  







  });
});
