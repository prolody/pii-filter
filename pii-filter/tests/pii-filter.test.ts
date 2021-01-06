import { PIIFilter } from '../src/pii-filter';
import { NL } from '../src/lang/nl/nl';
import { expect } from 'chai';

let pii_filter = new PIIFilter(new NL());
//'Theo, het product is heel aangekomen, ondanks het gat in de verpakking. Mijn naam is Bernard Janssen.'
describe('PII_Filter_NL', ()=>{
    it('classify_single_token', ()=>{
        let result = pii_filter.classify(
            'Hallo, mijn naam is Anouk, ik wilde graag melden dat mijn achternaam verkeerd staat in jullie dossier, het is namelijk van der Beek. Er is overigens meer vraag naar Paracetamol. Daarnaast heb je hier mijn mail adres: hoi.asd@hankel.com'
        );
        // expect(result).not.equals(null);
        // expect(result).is.instanceOf(PIIFilter.Classification.Result);
        // expect(result.num_pii).equals(1);
        // expect(result.pii[0].type).equals('voornaam');
        // expect(result.pii[0].severity).equals(1);
        // expect(result.severity).equals(1);
        
    });

    // it('classify_multi_token', ()=>{
    //     let pii_filter = new PIIFilter();
    //     let result = pii_filter.classify('Product is heel aangekomen, ondanks het gat in de verpakking. \
    //                                       Doet wat het moet doen, mvg Bernard.');
    //     expect(result).not.equals(null);
    //     expect(result).is.instanceOf(PIIFilter.Classification.Result);
    //     expect(result.num_pii).equals(1);
    //     expect(result.pii[0].type).equals('voornaam');
    //     expect(result.pii[0].severity).equals(1);
    //     expect(result.severity).equals(1);
        
    // });
});