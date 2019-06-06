import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
          ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
            
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
    })

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        // run ngOnInit
        fixture.detectChanges();
        
        const HeroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(HeroComponentsDEs.length).toBe(3);

        for(let i=0; i < HeroComponentsDEs.length; i++) {
            expect(HeroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
        
    })
});