import { Language } from '../../language-interface';
import { Parsing } from '../../parsing';

import { Classifiers } from './classifiers';

import ds_severity_mapping from './dataset/ds_severity.json';

export class NL implements Language
{
    public punctuation_map:     Map<string, number> =   new Map<string, number>();
    public max_assoc_distance:  number =                5;
    public punctuation:         RegExp =                new RegExp(/(\.|\,|\:|\=|\!|\?|\;|\ |\-|\/|\\|\_)/g);
    public dictionary:          Parsing.Classifier =    new Classifiers.Dictionary();
    public severity_mappings:   Array<{classifiers: Map<Parsing.Classifier, number>, severity: number}>;
    /**
     * 
     * @param classifiers a list of classifiers, if not specified, all will be used
     */
    constructor(
        public classifiers: Array<Parsing.Classifier> = [
            new Classifiers.FirstName(),
            new Classifiers.FamilyName(),
            new Classifiers.PetName(),
            new Classifiers.MedicineName(),
            new Classifiers.EmailAddress(),
            new Classifiers.PhoneNumber(),
            new Classifiers.Date(),
        ]
    )
    {
        // distance multipliers
        this.punctuation_map.set('.', 0.25);
        this.punctuation_map.set('!', 0.25);
        this.punctuation_map.set('?', 0.25);
        this.punctuation_map.set(';', 0.5);
        this.punctuation_map.set(',', 0.6);
        this.punctuation_map.set(' ', 0.9);
        this.punctuation_map.set(':', 1.0);
        this.punctuation_map.set('=', 1.0);
        this.punctuation_map.set('-', 1.0);
        this.punctuation_map.set('_', 1.0);
        this.punctuation_map.set('/', 1.0);
        this.punctuation_map.set('\\', 1.0);

        for (let classifier of this.classifiers)
            classifier.init(this);

        // ---- severity mapping
        this.severity_mappings = new Array<{classifiers: Map<Parsing.Classifier, number>, severity: number}>();
        for (let mapping of ds_severity_mapping)
        {
            let classifier_map = new Map<Parsing.Classifier, number>();
            for (let pii of mapping.pii)
            {
                // let found = false;
                for (let classifier of this.classifiers)
                {
                    if (pii === classifier.name)
                    {
                        if (!classifier_map.has(classifier))
                            classifier_map.set(classifier, 0);
                        
                        classifier_map.set(classifier, classifier_map.get(classifier) + 1);
                        // found = true;
                        break;
                    }
                }
            }
            this.severity_mappings.push({classifiers: classifier_map, severity: mapping.severity});
        }
    }
};