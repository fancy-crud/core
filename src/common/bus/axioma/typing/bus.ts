export interface BusCommand { new (...args: any[]): {} }
export interface BusHandler<T = any> { new (...args: any[]): { execute(command: any): T } }
