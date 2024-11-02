// hash256.js
async function hash256(data) {
    // 将输入转换为ArrayBuffer
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
  
    // 使用SubtleCrypto API生成SHA-256哈希
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  
    // 将ArrayBuffer转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }
  
  export default hash256;
let ans = await hash256('hello world');
console.log(ans); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9s