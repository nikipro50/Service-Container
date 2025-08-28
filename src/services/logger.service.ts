import { Service } from "../core/container";

@Service
export default class LoggerService {
    log(message: string) {
        console.log(`[LOG] ${message}`);
    }
}