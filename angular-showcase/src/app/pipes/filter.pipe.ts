import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'filter'})
export class FilterPipe<T extends Object> implements PipeTransform {
    transform(arr: T[], filterText: string): T[] {
        if(!arr){
            return [];
        }
        if (!filterText) {
            return arr;
        }

        return arr.filter(element => Object.values(element).some(field => this.equalToFilter(field, filterText)));
    }

    private equalToFilter(field: any, filterText: string){
      return field.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
    }
}
