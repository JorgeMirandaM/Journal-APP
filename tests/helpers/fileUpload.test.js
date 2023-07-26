import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:'dhwlhelp9',
    api_key:'216294683151338',
    api_secret:'Epd7swVdaqOuiAZd55yHQ23mbwE',
    secure:true
})


describe('tests in fileUpload file', () => { 

    test('Must upload the file correctly to cloudinary', async () => { 

        const imageUrl='https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=440&h=220&q=60';

        const resp= await fetch(imageUrl);
        const blob= await resp.blob();
        const file= new File([blob],'foto');
        const url= await fileUpload(file);

        expect(typeof url).toBe('string')

        const segments= url.split('/');
        const imageId=segments[segments.length-1].replace('.jpg','');
        

        await cloudinary.api.delete_resources(['journal-app/'+imageId],{
            resource_type:'image'
        });  
     })

     test('Must return null', async () => { 
        const file= new File([],'foto');
        const url= await fileUpload(file);

        expect( url).toBe(null)
      })

 })