import { Pipe, PipeTransform } from "@angular/core";
import { filter } from "rxjs";

@Pipe({name: 'filter'})
export class FilterPipe<T extends Object> implements PipeTransform {
    transform(arr: T[], filterText: string): T[] {
        if(!arr){
            return [];
        }
        if (!filterText) {
            return arr;
        }

        return arr.filter(element => Object.entries(element).some(field => {
          if(field[0] === "isLive"){ // Not ideal but allows filtering on the timespan column too
            const text = field[1] ? "Live" : "Historical";
            return this.equalToFilter(text, filterText);
          }
          return this.equalToFilter(field[1], filterText);
        }));
    }

    private equalToFilter(field: any, filterText: string){
      return field.toString().toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
    }
}
