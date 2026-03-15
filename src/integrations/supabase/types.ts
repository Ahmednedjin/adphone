export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          color: string | null
          created_at: string
          id: string
          logo: string | null
          name: string
          name_ar: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          name_ar: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          name_ar?: string
          slug?: string
        }
        Relationships: []
      }
      phone_images: {
        Row: {
          created_at: string
          id: string
          label: string | null
          phone_id: string
          sort_order: number | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          phone_id: string
          sort_order?: number | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          phone_id?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "phone_images_phone_id_fkey"
            columns: ["phone_id"]
            isOneToOne: false
            referencedRelation: "phones"
            referencedColumns: ["id"]
          },
        ]
      }
      phones: {
        Row: {
          antutu_score: string | null
          audio_jack: string | null
          audio_speakers: string | null
          battery_capacity: string | null
          battery_charging: string | null
          battery_reverse: string | null
          battery_wireless: string | null
          brand_id: string
          camera_front: string | null
          camera_macro: string | null
          camera_main: string | null
          camera_telephoto: string | null
          camera_ultrawide: string | null
          camera_video: string | null
          connectivity_bluetooth: string | null
          connectivity_gps: string | null
          connectivity_network: string | null
          connectivity_nfc: string | null
          connectivity_sim: string | null
          connectivity_wifi: string | null
          created_at: string
          design_colors: string | null
          design_frame: string | null
          design_height: string | null
          design_materials: string | null
          design_thickness: string | null
          design_weight: string | null
          design_width: string | null
          id: string
          image: string | null
          memory_ram: string | null
          memory_sd_card: string | null
          memory_storage: string | null
          memory_type: string | null
          name: string
          name_ar: string | null
          price: string | null
          price_category: string | null
          processor_cores: string | null
          processor_fabrication: string | null
          processor_frequency: string | null
          processor_gpu: string | null
          processor_name: string | null
          protection_standard: string | null
          protection_water: string | null
          quick_battery: string | null
          quick_camera: string | null
          quick_front_camera: string | null
          quick_memory: string | null
          quick_processor: string | null
          quick_screen: string | null
          release_date: string | null
          screen_back_protection: string | null
          screen_brightness: string | null
          screen_ppi: string | null
          screen_protection: string | null
          screen_refresh_rate: string | null
          screen_resolution: string | null
          screen_size: string | null
          screen_touch_rate: string | null
          screen_type: string | null
          sensor_compass: string | null
          sensor_face_unlock: string | null
          sensor_fingerprint: string | null
          sensor_gyroscope: string | null
          sensor_light: string | null
          sensor_other: string | null
          sensor_proximity: string | null
          slug: string
          software_os: string | null
          software_ui: string | null
          status: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          antutu_score?: string | null
          audio_jack?: string | null
          audio_speakers?: string | null
          battery_capacity?: string | null
          battery_charging?: string | null
          battery_reverse?: string | null
          battery_wireless?: string | null
          brand_id: string
          camera_front?: string | null
          camera_macro?: string | null
          camera_main?: string | null
          camera_telephoto?: string | null
          camera_ultrawide?: string | null
          camera_video?: string | null
          connectivity_bluetooth?: string | null
          connectivity_gps?: string | null
          connectivity_network?: string | null
          connectivity_nfc?: string | null
          connectivity_sim?: string | null
          connectivity_wifi?: string | null
          created_at?: string
          design_colors?: string | null
          design_frame?: string | null
          design_height?: string | null
          design_materials?: string | null
          design_thickness?: string | null
          design_weight?: string | null
          design_width?: string | null
          id?: string
          image?: string | null
          memory_ram?: string | null
          memory_sd_card?: string | null
          memory_storage?: string | null
          memory_type?: string | null
          name: string
          name_ar?: string | null
          price?: string | null
          price_category?: string | null
          processor_cores?: string | null
          processor_fabrication?: string | null
          processor_frequency?: string | null
          processor_gpu?: string | null
          processor_name?: string | null
          protection_standard?: string | null
          protection_water?: string | null
          quick_battery?: string | null
          quick_camera?: string | null
          quick_front_camera?: string | null
          quick_memory?: string | null
          quick_processor?: string | null
          quick_screen?: string | null
          release_date?: string | null
          screen_back_protection?: string | null
          screen_brightness?: string | null
          screen_ppi?: string | null
          screen_protection?: string | null
          screen_refresh_rate?: string | null
          screen_resolution?: string | null
          screen_size?: string | null
          screen_touch_rate?: string | null
          screen_type?: string | null
          sensor_compass?: string | null
          sensor_face_unlock?: string | null
          sensor_fingerprint?: string | null
          sensor_gyroscope?: string | null
          sensor_light?: string | null
          sensor_other?: string | null
          sensor_proximity?: string | null
          slug: string
          software_os?: string | null
          software_ui?: string | null
          status?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          antutu_score?: string | null
          audio_jack?: string | null
          audio_speakers?: string | null
          battery_capacity?: string | null
          battery_charging?: string | null
          battery_reverse?: string | null
          battery_wireless?: string | null
          brand_id?: string
          camera_front?: string | null
          camera_macro?: string | null
          camera_main?: string | null
          camera_telephoto?: string | null
          camera_ultrawide?: string | null
          camera_video?: string | null
          connectivity_bluetooth?: string | null
          connectivity_gps?: string | null
          connectivity_network?: string | null
          connectivity_nfc?: string | null
          connectivity_sim?: string | null
          connectivity_wifi?: string | null
          created_at?: string
          design_colors?: string | null
          design_frame?: string | null
          design_height?: string | null
          design_materials?: string | null
          design_thickness?: string | null
          design_weight?: string | null
          design_width?: string | null
          id?: string
          image?: string | null
          memory_ram?: string | null
          memory_sd_card?: string | null
          memory_storage?: string | null
          memory_type?: string | null
          name?: string
          name_ar?: string | null
          price?: string | null
          price_category?: string | null
          processor_cores?: string | null
          processor_fabrication?: string | null
          processor_frequency?: string | null
          processor_gpu?: string | null
          processor_name?: string | null
          protection_standard?: string | null
          protection_water?: string | null
          quick_battery?: string | null
          quick_camera?: string | null
          quick_front_camera?: string | null
          quick_memory?: string | null
          quick_processor?: string | null
          quick_screen?: string | null
          release_date?: string | null
          screen_back_protection?: string | null
          screen_brightness?: string | null
          screen_ppi?: string | null
          screen_protection?: string | null
          screen_refresh_rate?: string | null
          screen_resolution?: string | null
          screen_size?: string | null
          screen_touch_rate?: string | null
          screen_type?: string | null
          sensor_compass?: string | null
          sensor_face_unlock?: string | null
          sensor_fingerprint?: string | null
          sensor_gyroscope?: string | null
          sensor_light?: string | null
          sensor_other?: string | null
          sensor_proximity?: string | null
          slug?: string
          software_os?: string | null
          software_ui?: string | null
          status?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "phones_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
