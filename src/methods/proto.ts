

export class ProtoEntity {
  isProto = true
  
  constructor(
    public contents: Array<{ key: string, value: any }>,
    public timestamp?: number,
  ) {
    if (!Array.isArray(contents)) {
      throw new Error('ProtoEntity param must be an Array.')
    }
    
    const notPass = contents.find(item => !item.key || !item.value)
    if (notPass) {
      throw new Error('the param "content" of ProtoEntity has format error.')
    }
  }
  
}

