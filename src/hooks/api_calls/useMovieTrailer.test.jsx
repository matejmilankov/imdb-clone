import { vi } from "vitest";
import axios from "axios";

vi.mock('axios');

axios.get('https://api.themoviedb.org/3/movie/1228834/videos')