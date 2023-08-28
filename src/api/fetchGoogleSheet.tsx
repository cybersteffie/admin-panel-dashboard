import axios from "axios";

const googleSheetApi = {
  fetchData: async (link: string) => {
    try {
      const response = await axios.get(link);

      const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));

      let keys: string[] = [],
        data: object[] = [];
      let tjson: Record<string, any> = {};

      jsonData.table.cols.forEach((d: { label: string }) => {
        keys.push(d.label);
      });

      jsonData.table.rows.forEach((d: { c: any[] }, i: number) => {
        tjson = {};
        d.c.forEach((sub, j) => {
          if (sub !== null) {
            if (sub.f !== undefined) {
              if (sub.f.includes(",")) sub.f = sub.f.replace(",", ".");
              tjson[keys[j]] = parseFloat(sub.f);
            } else if (sub.v != null) {
              tjson[keys[j]] = sub.v;
            } else {
              tjson[keys[j]] = 0;
            }
          } else {
            tjson[keys[j]] = "";
          }
        });

        //   if (tjson["Chart number"] == 0) {
        data.push(tjson);
      });

      // setSheetData(data);
      return data; //
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};

export default googleSheetApi;
