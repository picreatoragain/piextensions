  class BrainFuck {
    getInfo() {
      return {
        id: 'brfk',
        name: 'BrainFuck',
        "color1": "#0f5786",
        docsURI: 'https://docs.google.com/document/d/13IZz_fzFZlZTiwgjecgFuSogm5H_X4Rg3E-WlqAh9C4/edit?usp=sharing',
        blocks: [
          {
            opcode: 'run',
            blockType: Scratch.BlockType.REPORTER,
            text: 'run brainfuck [code] in [bit] input array [autoarg] for [length] cycles, return [f]',
              arguments: {
              code: {
                type: Scratch.ArgumentType.STRING
              },
                autoarg: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
                length: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1e+6'
              },
                f: {
                type: Scratch.ArgumentType.STRING,
                menu: 'FORMAT_MENU',
                defaultValue: 'output'
              },
                bit: {
                type: Scratch.ArgumentType.STRING,
                menu: 'BIT_MENU',
                defaultValue: '8 bit'
              }
          }
          },

          {
            opcode: 'toascii',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert to ascii [txt] [ascii]',
              arguments: {
              txt: {
                type: Scratch.ArgumentType.STRING
              },
                             ascii: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ASCII_MENU',
                defaultValue: 'text'
              }
              }
          },
            {
            opcode: 'inascii',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert ascii inputs for input arrays [txt]',
              arguments: {
              txt: {
                type: Scratch.ArgumentType.STRING
              },
              }
          },
                {
            opcode: 'getbfkfrom',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get brainfuck commands from [txt]',
              arguments: {
              txt: {
                type: Scratch.ArgumentType.STRING
              },
              }
          },
          {
            opcode: '1',
            blockType: Scratch.BlockType.LABEL,
            text: 'debug stuff',
              arguments: {
              txt: {
                type: Scratch.ArgumentType.STRING
              },
              }
          },
        ],
          menus: {
          FORMAT_MENU: {
            acceptReporters: false,
            items: ['output','cycle length', 'memorybytes','pointer',]
          },
            ASCII_MENU: {
            acceptReporters: false,
            items: ['text','array',]
          },
           BIT_MENU: {
            acceptReporters: false,
            items: ['8 bit','16 bit']
          }
        }
      };  
    }

    run(args) {
      if (args.bit === '8 bit')
      {
      var max = 255
       var values = new Uint8Array(max+1);
      }
      if (args.bit === '16 bit')
      {
      var max = 65534
       var values = new Uint16Array(max+1);
      }
      let p = 0;
      let parser = 0;
      let out = [];
      try {var inputarray = JSON.parse(args.autoarg)} catch (e) { return 'invalid inputs';}
      let code = args.code;
       code = code.split("")
      let teste = "+-><.,[]";
       code = code.filter(function (str) { return teste.includes(str); });
      let leng = args.length
     
      let test = 0;
      let safety = 0;
      while (test < code.length && safety < leng)
  {
  switch(code[test])
  {
      case '>':
      p++;
        if (p > max)
        {
          p = 0
        }
      break;
      case '<':
      p--;
      if (p < 0)
        {
          p = max
        }
      break;
      case '+':
      values[p]++;
      
      break;
      case '-':
      values[p]--;
      
      break;    
      case '[':
      if (values[p] === 0)
      {
          let nestv = 1;
          while (nestv > 0  && test < code.length)
          {
              test++; 
              if (code[test] === '[')
              {
              nestv++;
              }
              if (code[test] === ']')
              {
              nestv--;    
              }
          }
      }
      break;
      case ']':
          if (values[p] != 0)
      {
          let nestv = 1;
          while (nestv > 0 && test > 0)
          {
              test--; 
              if (code[test] === '[')
              {
              nestv--;
              }
              if (code[test] === ']')
              {
              nestv++;    
              }
          }
      }
      break;
      case '.':
      out.push(values[p]);
      break;
      case ',':
      values[p] = inputarray[parser];
      
      parser++;
      if (parser > inputarray.length-1)
      {
        parser = 0 
      }
      break;
  }
  test++;
  safety++;
  }
  const finalize = out.toString();
  const otherfinalize = values.toString();
  const dropdown = args.f;
      //return values[0];
      if (dropdown === 'output')
      {
      return JSON.stringify(out);
      }
      if (dropdown === 'cycle length')
      {
      return safety;
      }
      if (dropdown === 'memorybytes')
      {
      return otherfinalize;
      }
      if (dropdown === 'pointer')
      {
      return p;
      }
    }
    toascii(args) {
       try {var inputarray = JSON.parse(args.txt)} catch (e) { return 'invalid inputs';}
      let finish = "";
      let water = 0;
      let yawn = 0;
      for(yawn = 0; yawn < inputarray.length; yawn++)
      {
        inputarray[yawn] = String.fromCharCode(inputarray[yawn]);
      }
      if (args.ascii === 'array')
      {
      return JSON.stringify(inputarray);
      }
           if (args.ascii === 'text')
      {
      return inputarray.join("");
      }
  }

  inascii(args) {
    try {var inputarray = JSON.parse(args.txt)} catch (e) { return 'invalid inputs';}
      let finish = "";
      let water = 0;
      let yawn = 0;
      for(yawn = 0; yawn < inputarray.length; yawn++)
      {
        inputarray[yawn] = inputarray[yawn].charCodeAt(0);
      }
      return JSON.stringify(inputarray);

  }
  getbfkfrom(args) {
let debugtxt = args.txt;
 debugtxt = debugtxt.split("")
let debugletters = "+-><.,[]"
 debugtxt = debugtxt.filter(function (str) { return debugletters.includes(str);});
 debugtxt = debugtxt.join("")
return debugtxt;
      
  }

  }

  Scratch.extensions.register(new BrainFuck());
