import { Injectable } from '@nestjs/common';
import { ShortestPathDto } from './app.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  findRuteWithGrapho(
    shortestPathDto: ShortestPathDto
  ) {

    const { graph, startCountry, endCountry } = shortestPathDto;

    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited: Set<string> = new Set();
    const unvisited: string[] = Object.keys(graph);

    for (const country of unvisited) {
      distances[country] = Infinity;
      previous[country] = null;
    }
    distances[startCountry] = 0;

    while (unvisited.length) {
      const currentCountry = unvisited
        .filter(country => !visited.has(country))
        .reduce((prev, curr) => (distances[prev] < distances[curr] ? prev : curr));

      if (distances[currentCountry] === Infinity) break;

      visited.add(currentCountry);
      unvisited.splice(unvisited.indexOf(currentCountry), 1);

      for (const neighbor in graph[currentCountry]) {
        const newDistance = distances[currentCountry] + graph[currentCountry][neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentCountry;
        }
      }
    }

    const path: string[] = [];
    let current: string | null = endCountry;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    if (path[0] !== startCountry) {
      return { path: [], distance: Infinity };
    }

    return { path, distance: distances[endCountry] };
    
  }
}
