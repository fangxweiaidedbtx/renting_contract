var code = "60ca67ec-d345-407d-8df7-fa688e0bfd63"
const Storage = artifacts.require("Storage");
 
contract("Storage", (accounts) => {
  let storageInstance;
 
  before(async () => {
    storageInstance = await Storage.deployed();
  });
 
  it("should store a value", async () => {
    const newValue = 42;
    await storageInstance.store(newValue);
    const storedValue = await storageInstance.retrieve();
    assert.equal(storedValue, newValue, "Value was not stored correctly");
  });
 
  it("should retrieve the stored value", async () => { 
    const storedValue = await storageInstance.retrieve();
    assert.equal(storedValue, 42, "Stored value is incorrect");
  });
});